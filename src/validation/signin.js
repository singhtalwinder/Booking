import Joi from "@hapi/joi";

export default (data) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	});
	return schema.validate(data);
};
