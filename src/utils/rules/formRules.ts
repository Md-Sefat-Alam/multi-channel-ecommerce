import { Rule } from "antd/es/form";
import { useTranslations } from "next-intl";

// Hook to get validation messages
export const useFormValidationMessages = () => {
  const t = useTranslations("validation");

  const rule_required = (message?: string): Rule => {
    return {
      required: true,
      message: message || t("required"),
    };
  };

  const rule_numeric = (message?: string): Rule => {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value) return Promise.resolve();
        if (value && /^\d*$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message || t("numericOnly")));
      },
    });
  };

  const rule_email = (message?: string): Rule => {
    return {
      type: "email",
      message: message || t("validEmail"),
    };
  };

  const rule_confirmPassword = (
    formFieldName: string,
    message?: string,
  ): Rule => {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (getFieldValue(formFieldName) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message || t("passwordNotMatched")));
      },
    });
  };

  const rule_confirmPassword_unique_by_old_one = (
    formFieldName: string,
    oldPassFieldName: string,
    message?: string,
  ): Rule => {
    return ({ getFieldValue }) => ({
      validator(_, value) {
        if (getFieldValue(formFieldName) !== getFieldValue(oldPassFieldName)) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(message || t("useNewPassword")));
      },
    });
  };

  const rule_bangladesh_mobile = (message?: string): Rule => {
    return {
      validator(_, value) {
        const bangladeshMobileRegex = /^(\+8801|8801|01)[3-9]\d{8}$/;
        if (!value || bangladeshMobileRegex.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(
          new Error(message || t("validBangladeshiMobile")),
        );
      },
    };
  };

  return {
    rule_required,
    rule_numeric,
    rule_email,
    rule_confirmPassword,
    rule_confirmPassword_unique_by_old_one,
    rule_bangladesh_mobile,
  };
};

// For backward compatibility - standalone functions that use default English messages
// These can be used in components that haven't been converted to use translations yet
export const rule_required = (message?: string): Rule => {
  return {
    required: true,
    message: message || "This field is required!",
  };
};

export const rule_numeric = (message?: string): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) return Promise.resolve();
      if (value && /^\d*$/.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(message || "Only Numeric values are allowed!"),
      );
    },
  });
};

export const rule_email = (message?: string): Rule => {
  return {
    type: "email",
    message: message || "Please enter a valid email!",
  };
};

export const rule_confirmPassword = (
  formFieldName: string,
  message?: string,
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue(formFieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message || "Password not matched!"));
    },
  });
};

export const rule_confirmPassword_unique_by_old_one = (
  formFieldName: string,
  oldPassFieldName: string,
  message?: string,
): Rule => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (getFieldValue(formFieldName) !== getFieldValue(oldPassFieldName)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message || "Use new password!"));
    },
  });
};

export const rule_bangladesh_mobile = (message?: string): Rule => {
  return {
    validator(_, value) {
      const bangladeshMobileRegex = /^(\+8801|8801|01)[3-9]\d{8}$/;
      if (!value || bangladeshMobileRegex.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(message || "Please enter a valid Bangladeshi mobile number!"),
      );
    },
  };
};
