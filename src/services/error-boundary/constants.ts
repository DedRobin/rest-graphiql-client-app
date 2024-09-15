export const errorMessageList: { [key: string]: { en: string; ru: string } } = {
  "Firebase: Error (auth/invalid-credential).": {
    en: "Invalid email or password",
    ru: "Неправильная почта или пароль",
  },
  "Unexpected end of JSON input": {
    en: "Editor is empty",
    ru: "Редактор пуст",
  },
  GraphQLError: {
    en: "Invalid GraphQL query",
    ru: "Неверный запрос GraphQL",
  },
  SyntaxError: {
    en: "Invalid JSON data",
    ru: "Недопустимые JSON данные",
  },
  SyntaxErrorBody: {
    en: "Invalid JSON data in request's body",
    ru: "Недопустимые JSON данные в теле запроса",
  },
  "Failed to fetch": {
    en: "The data could not be retrieved. Check that the URL, Variables or Body are correct",
    ru: "Не удалось получить данные. Проверьте правильность URL-адреса, переменных и тела",
  },
};
