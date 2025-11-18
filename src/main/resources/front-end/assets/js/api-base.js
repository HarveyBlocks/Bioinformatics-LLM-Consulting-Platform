(function(global) {
	const ApiBase = {};
	const LOCAL_AUTHORIZATION_TOKEN_KEY = 'AUTHORIZATION_TOKEN';
	const AUTHORIZATION_HEADER = 'authorization';
	// 统一持久化 token（localStorage + cookie）
	ApiBase.persistToken = function(token) {
		if (!token) return;
		try {
			localStorage.setItem(LOCAL_AUTHORIZATION_TOKEN_KEY, token);
			// 简单设为 Lax，若需要跨站可改为 None; Secure（需 HTTPS）
			document.cookie = `${LOCAL_AUTHORIZATION_TOKEN_KEY}=${encodeURIComponent(
					token)}; path=/; SameSite=Lax`;
		} catch (e) {
		}
	};

	function parseJsonPreserveBigInt(text) {
		if (typeof text !== 'string') return text;
		let result = '';
		let inString = false;
		let escapeNext = false;
		let inNumber = false;
		let numberBuffer = '';
		let hasDecimalOrExponent = false;
		for (let i = 0; i < text.length; i++) {
			const ch = text[i];
			if (inString) {
				result += ch;
				if (escapeNext) {
					escapeNext = false;
				} else if (ch === '\\') {
					escapeNext = true;
				} else if (ch === '"') {
					inString = false;
				}
				continue;
			}
			if (inNumber) {
				if ((ch >= '0' && ch <= '9')) {
					numberBuffer += ch;
					continue;
				}
				if (ch === '.' || ch === 'e' || ch === 'E') {
					hasDecimalOrExponent = true;
					numberBuffer += ch;
					continue;
				}
				if ((ch === '+' || ch === '-') && numberBuffer.match(/[eE]$/)) {
					hasDecimalOrExponent = true;
					numberBuffer += ch;
					continue;
				}
				const isNegative = numberBuffer.startsWith('-');
				const digits = isNegative ? numberBuffer.slice(1) : numberBuffer;
				if (!hasDecimalOrExponent && digits.length >= 16 &&
						/^\d+$/.test(digits)) {
					result += `"${numberBuffer}"`;
				} else {
					result += numberBuffer;
				}
				inNumber = false;
				numberBuffer = '';
				hasDecimalOrExponent = false;
				i--;
				continue;
			}
			if (ch === '"') {
				inString = true;
				result += ch;
				continue;
			}
			if (ch === '-' || (ch >= '0' && ch <= '9')) {
				inNumber = true;
				numberBuffer = ch;
				hasDecimalOrExponent = false;
				continue;
			}
			result += ch;
		}
		if (inNumber) {
			const isNegative = numberBuffer.startsWith('-');
			const digits = isNegative ? numberBuffer.slice(1) : numberBuffer;
			if (!hasDecimalOrExponent && digits.length >= 16 &&
					/^\d+$/.test(digits)) {
				result += `"${numberBuffer}"`;
			} else {
				result += numberBuffer;
			}
		}
		try {
			return JSON.parse(result);
		} catch (e) {
			return JSON.parse(text);
		}
	}

	function getAuthHeaders() {
		// 动态从本地读取 token（推荐）
		try {
			const t = localStorage.getItem(LOCAL_AUTHORIZATION_TOKEN_KEY);
			if (t) return {AUTHORIZATION_HEADER: t};
		} catch (e) {
		}
		return {};
	}

	ApiBase.request = async function(url, {method = 'GET', data, headers} = {}) {
		const opts = {
			method: method, headers: {
				'Accept': '*/*', ...(data ?
						{'Content-Type': 'application/json'} :
						{}), ...getAuthHeaders(), ...headers,
			}, body: data ? JSON.stringify(data) : undefined,
		};
		let res;
		try {
			res = await fetch(url, opts);
		} catch (err) {
			console.error('API error:', err);
			throw new Error(
					'网络请求失败，可能是跨域或网络不可达（请使用本地服务器打开前端，或在后端开启 CORS 并允许来源）');
		}
		// 尝试从响应头捕获并保存 Token（如果后端提供）
		try {
			const hAuth = res.headers.get(AUTHORIZATION_HEADER);
			if (hAuth) API_BASE.persistToken(hAuth);
		} catch (e) {
		}
		const contentType = res.headers.get('content-type') || '';
		let payload;
		try {
			if (contentType.includes('application/json')) {
				const text = await res.text();
				payload = parseJsonPreserveBigInt(text);
			} else {
				payload = await res.text();
			}
		} catch (e) {
			// ignore
		}
		if (!res.ok || payload == null) {
			throw new Error(`HTTP ${res.status}` + payload);
		}
		// code 是HTTP响应状态码, 不是0/1!!!!!!!!
		// 默认返回结构 { code, data, msg }
		return payload;
	};

	function num2Str(dataNum) {
		return dataNum < 10 ? `0${dataNum}` : `${dataNum}`;
	}

	/**
	 * @param {Date} date
	 */
	function dateToPathVariable(date) {
		let fullYear = date.getFullYear();
		let month = num2Str(date.getMonth() + 1); // month 从0开始
		let day = num2Str(date.getDate());
		let hours = num2Str(date.getHours());
		let minutes = num2Str(date.getMinutes());
		let seconds = num2Str(date.getSeconds());
		return `${fullYear}-${month}-${day}_${hours}:${minutes}:${seconds}`;
	}

	ApiBase.pathVariableWithDatePage = function(timeFrom, timeTo, limit, page) {
		const q = [];
		if (!timeFrom) timeFrom = new Date(0);
		q.push(`${dateToPathVariable(timeFrom)}`);
		if (!timeTo) timeTo = new Date();
		q.push(`${dateToPathVariable(timeTo)}`);
		if (limit == null) limit = 20;
		q.push(`${limit}`);
		if (page == null) page = 1;
		q.push(`${page}`);
		return `/${q.join('/')}`;
	};

	ApiBase.pathVariableWithPage = function(limit, page) {
		const q = [];
		if (limit == null) limit = 20;
		q.push(`${limit}`);
		if (page == null) page = 1;
		q.push(`${page}`);
		return `/${q.join('/')}`;
	};
	ApiBase.safe = async (fn, ...args) => {
		try {
			const res = await fn(...args);
			return {ok: res != null && res.code === 200, msg: res.msg, res};
		} catch (e) {
			console.error('API error:', e);
			return {ok: false, msg: e.message || '请求失败'};
		}
	};

	global.API_BASE = ApiBase;
})(window);