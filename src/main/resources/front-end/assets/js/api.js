// 简易 API 客户端，基于 default.md 文档
(function(global) {
	// 允许通过 window.API_BASE 或 localStorage.API_BASE 覆盖后端地址
	const DEFAULT_BASE = 'http://47.96.191.232:80/api';
	const BASE = DEFAULT_BASE.replace(/\/+$/, '');
	// 始终携带 Cookie，确保会话能建立（需要后端允许 CORS 且 Allow-Credentials=true）
	const USE_CREDENTIALS = true;
	const Api = {
		auth: {
			login: (loginForm) => API_BASE.request(
					`${BASE}/user/login`, {method: 'POST', data: loginForm}),
			logout: () => API_BASE.request(`${BASE}/user/logout`, {method: 'POST'}),
			register: (registerForm) => API_BASE.request(
					`${BASE}/user/register`,
					{method: 'POST', data: registerForm},
			),
			me: () => API_BASE.request(`${BASE}/user/me`), // TODO
			update: (userDto) => API_BASE.request(
					`${BASE}/user/update`,
					{method: 'PUT', data: userDto},
			),
			getById: (id) => API_BASE.request(`${BASE}/user/${id}`),
		}, robot: {
			chat: (model = 'deepseek', message) => {
				const path = model === 'qwen' ?
						'/robot/chat/qwen' :
						'/robot/chat/deepseek';
				const payload = typeof message === 'string' ?
						{message} :
						(message || {});
				return API_BASE.request(
						`${BASE}${path}`, {method: 'POST', data: payload});
			}, //  用户个人中心, 咨询记录页面, 放这个东西
			historyMe: ({limit, page, timeFrom, timeTo} = {}) => {
				const qs = API_BASE.pathVariableWithDatePage(
						timeFrom, timeTo, limit, page);
				return API_BASE.request(`${BASE}/robot/history/me${qs}`);
			}, pieces: ({chatId, limit}) => {
				// 文档为 DELETE /robot/pieces/{chat-id}/{limit}
				const path = `${chatId}/${limit}`;
				return API_BASE.request(
						`${BASE}/robot/pieces/${path}`, {method: 'DELETE'});
			},
		}, points: {
			gifts: (page = 1, limit = 12) => API_BASE.request(
					`${BASE}/gift/all/${limit}/${page}`),
			giftsInRange: ({lower = 0, upper = null, page = 1, limit = 12}) => {
				const up = upper == null ? '' : `&upper=${upper}`;
				return API_BASE.request(
						`${BASE}/gift/cost-in-range/${lower}/${up}/${limit}/${page}`);
			},
			consume: (id) => API_BASE.request(
					`${BASE}/gift/consume/`,
					{method: 'PUT', data: {id}},
			),
			detail: (id) => API_BASE.request(`${BASE}/gift/detail/${id}`), // TODO
			selfPointHistory: (limit = 20, page = 1) => API_BASE.request(
					`${BASE}/user/points/history/${limit}/${page}`),
		}, feedback: {
			submit: (text) => API_BASE.request(
					`${BASE}/feedback/feedback`, {method: 'POST', data: {text}}),
		}, consult: {
			getMine: () => API_BASE.request(`${BASE}/consultation-content/me`),
			update: (dto) => API_BASE.request(
					`${BASE}/consultation-content/update`,
					{method: 'PUT', data: dto},
			),
		}, admin: {
			users: (page = 1, limit = 10) => API_BASE.request(
					`${BASE}/admin/user/all/${limit}/${page}`),
			userOne: (id) => API_BASE.request(`${BASE}/admin/user/one/${id}`),
			userUpdate: (info) => API_BASE.request(
					`${BASE}/admin/user/update`,
					{method: 'PUT', data: info},
			),
			consultAll: (page = 1, limit = 10) => API_BASE.request(
					`${BASE}/admin/consultation/all/${limit}/${page}`),
			consultCombineAll: (page = 1, limit = 10) => API_BASE.request(
					`${BASE}/admin/consultation/combine/all/${limit}/${page}`),
			consultCombineById: (id) => API_BASE.request(
					`${BASE}/admin/consultation/combine/${id}`),
			consultByUserId: (userId) => API_BASE.request(
					`${BASE}/admin/consultation/user/${userId}`),
			hotWords: (limit = 10) => API_BASE.request(
					`${BASE}/admin/consultation/hot-word/${limit}`),
			feedbackNotRead: ({limit, page, timeFrom, timeTo} = {}) => {
				const qs = API_BASE.pathVariableWithDatePage(
						timeFrom, timeTo, limit, page);
				return API_BASE.request(`${BASE}/admin/feedback/not-read${qs}`);
			},
			feedbackReadList: ({limit, page, timeFrom, timeTo} = {}) => {
				const qs = API_BASE.pathVariableWithDatePage(
						timeFrom, timeTo, limit, page);
				return API_BASE.request(`${BASE}/admin/feedback/read${qs}`);
			},
			feedbackMarkRead: (id) => API_BASE.request(
					`${BASE}/admin/feedback/read`,
					{method: 'PUT', data: id},
			),
			feedbackByUser: ({userId, read = false, limit, page}) => {
				if (read !== true) read = false;
				const base = `${BASE}/admin/feedback/user/${userId}/${read}`;
				const qs = API_BASE.pathVariableWithPage(limit, page);
				return API_BASE.request(`${base}${qs}`);
			},
			robotHistoryUser: ({userId, timeFrom, timeTo, limit, page}) => {
				const qs = API_BASE.pathVariableWithDatePage(
						timeFrom, timeTo, limit, page);
				return API_BASE.request(`${BASE}/admin/robot/history/${userId}${qs}`);
			},
			actionCostLongerThan: ({ms, limit, page}) => {
				const q = [];
				const qs = API_BASE.pathVariableWithPage(limit, page);
				let url = `${BASE}/admin/action/cost/${ms}${qs}`;
				return API_BASE.request(url);
			},
			actionRequestTimeLatest: ({timeFrom, timeTo, limit, page} = {}) => {
				const qs = API_BASE.pathVariableWithDatePage(
						timeFrom, timeTo, limit, page);
				return API_BASE.request(
						`${BASE}/admin/action/request-time-latest${qs}`);
			},
			giftInsert: (giftInfo) => API_BASE.request(
					`${BASE}/admin/gift/insert`,
					{method: 'POST', data: giftInfo},
			), // TODO
			giftUpdate: (giftInfo) => API_BASE.request(
					`${BASE}/admin/gift/update`,
					{method: 'PUT', data: giftInfo},
			),
			giftDelete: (id) => API_BASE.request(
					`${BASE}/admin/gift/delete/${id}`,
					{method: 'DELETE'},
			),
		}, // 基础能力暴露
		get BASE() {
			return BASE;
		}, setBase(next) {
			if (typeof next === 'string' && next) {
				localStorage.setItem('API_BASE', next);
				location.reload();
			}
		}, get token() {
			return localStorage.getItem('API_TOKEN') || '';
		}, setToken(tok) {
			if (tok) API_BASE.persistToken(tok); else {
				localStorage.removeItem('API_TOKEN');
				document.cookie = 'API_TOKEN=; Max-Age=0; path=/';
			}
		}, clearToken() {
			localStorage.removeItem('API_TOKEN');
		}, pingEcho(message = 'ping') {
			return API_BASE.request(`${BASE}/hello/echo/${message}`);
		},
	};

	// 简单的容错封装：失败时返回 null 并记录 msg
	Api.safe = API_BASE.safe;

	global.API = Api;
})(window);


