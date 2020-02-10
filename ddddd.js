getFieldDecorator('username', {rules: [{ required: true, message: '请输入用户名！' }],})(
	<Input
		prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
		placeholder="Username"
	/>,
)


