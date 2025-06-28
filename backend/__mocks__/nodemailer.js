const sendMailMock = jest.fn();

module.exports = {
  createTransport: jest.fn(() => ({
    sendMail: sendMailMock,
  })),
  __esModule: true,
  sendMailMock,
};
