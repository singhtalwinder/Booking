import Joi from "@hapi/joi";

export default (data) => {
	const schema = Joi.object({
		email: Joi.string().min(6).max(40).required().email(),
		password: Joi.string().min(6).max(20).required(),
	});
	return schema.validate(data);
};
