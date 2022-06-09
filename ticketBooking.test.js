const {
  showCode,
  checkTicketDataAfterBooking,
  chooseAndClickChair,
  book,
  chooseDay,
  chooseTimeAndFilm,
  checkUrl,
  codeIsVisible,
} = require("./lib/commands");
const { getTomorrowDay } = require("./lib/util");

let page;

describe("Ticket Booking Tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  afterEach(async () => {
    await page.close();
  });

  test("Positive - Should book ticket 1  - tomorrow", async () => {
    const day = getTomorrowDay();
    const film = '"Фильм 3"';
    const filmForEqual = film.slice(1, -1);
    const hallForEqual = "Зал3";
    const time = '"14:00"';
    const chair = 9;
    const row = 9;
    const expectedUrlAfterAttemptOfBooking = "http://qamid.tmweb.ru/client/payment.php";
    await chooseDay(page, day);
    await chooseTimeAndFilm(page, film, time);
    await chooseAndClickChair(page, row, chair);
    await book(page);
    await page.waitForNavigation();
    await page.waitForSelector(".ticket__check-title", { timeout: 30000 });
    await checkUrl(page, expectedUrlAfterAttemptOfBooking);
    await checkTicketDataAfterBooking(page, filmForEqual, hallForEqual);
    await showCode(page);
    await codeIsVisible(page);
  });

  test("Positive - Should book ticket 2  - tomorrow", async () => {
    const day = getTomorrowDay();
    const film = '"Фильм 1"';
    const filmForEqual = film.slice(1, -1);
    const hallForEqual = "Зал2";
    const time = '"19:00"';
    const row = 9;
    const chair = 9;
    const expectedUrlAfterAttemptOfBooking = "http://qamid.tmweb.ru/client/payment.php";
    await chooseDay(page, day);
    await chooseTimeAndFilm(page, film, time);
    await chooseAndClickChair(page, row, chair);
    await book(page);
    await page.waitForNavigation();
    await page.waitForSelector(".ticket__check-title", { timeout: 60000 });
    await checkUrl(page, expectedUrlAfterAttemptOfBooking);
    await checkTicketDataAfterBooking(page, filmForEqual, hallForEqual);
    await showCode(page);
    await codeIsVisible(page);
  });

  test("Negative - Should not book booked ticket 3  - tomorrow", async () => {
    const day = getTomorrowDay();
    const film = '"Фильм 3"';
    const time = '"14:00"';
    const row = 3;
    const chair = 1;
    const expectedUrlAfterAttemptOfBooking = "http://qamid.tmweb.ru/client/hall.php";
    await chooseDay(page, day);
    await chooseTimeAndFilm(page, film, time);
    await chooseAndClickChair(page, row, chair);
    await book(page);
    const finalSelector = await page.$(".ticket__check-title");
    expect(finalSelector).toEqual(null);
    await checkUrl(page, expectedUrlAfterAttemptOfBooking);
  });
});
