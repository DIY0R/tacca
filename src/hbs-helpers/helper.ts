export const helpers = {
  lengthChek: function (value) {
    return value > 10 ? 'true' : 'false';
  },
  stringToArray: (value: string) => {
    return `${value}`.split(',');
  },
  lengthError: (value: Array<string>) => {
    console.log((!!value.length).toString());
    return !!value.length;
  },
};
