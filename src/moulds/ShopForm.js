const Yup = require('yup');

exports.createShopFormSchema = () =>
  Yup.object({
    name: Yup.string()
      .required('店铺名称不能为空')
      .min(2, '店铺名称至少 2 个字符')
      .max(10, '店铺名称不可超过 10 个字符'),
  });
