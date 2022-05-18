let url_config = '';
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://192.168.3.71:8066'
} else {
	// 生产环境
	url_config = 'http://192.168.2.133:44304'
}

export default url_config
