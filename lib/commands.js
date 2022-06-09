module.exports = {
  chooseDay: async function (page, day) {
    try {
      const [weekDay] = await page.$x(`//span[contains(text(), ${day})]`);
      await weekDay.click();
    } catch (error) {
      throw new Error("Choice of day is failed");
    }
  },

  chooseTimeAndFilm: async function (page, film, time) {
    try {
      const [parentElementThatHaveChildElementWithSpesialName] = await page.$x(
        `//section[./div[./div[./h2[contains(text(), ${film})]]]]`
      );
      const [timeElement] =
        await parentElementThatHaveChildElementWithSpesialName.$x(
          `//a[contains(text(), ${time})]`
        );
      await timeElement.click();
    } catch (error) {
      throw new Error("Choice of time and film is failed");
    }
  },

  chooseAndClickChair: async function (page, row, chair) {
    try {
      const [rowElement] = await page.$x(`.buying-scheme__row:nth-child(${row})`);
      const [chairElement] = await rowElement.$x(`.buying-scheme__chair:nth-child(${chair})`);
      await chairElement.click();
    } catch (error) {
      throw new Error("Chair was not chosen");
    }
  },
  
  book: async function (page) {
    try {
      const [bookingButton] = await page.$x(
        '//button[contains(text(),"Забронировать")]'
      );
      await bookingButton.click();
    } catch (error) {
      throw new Error("Booking is failed");
    }
  },

  checkUrl: async function (page, expectedUrlAfterAttemptOfBooking) {
    try {
      /* await page.waitForTimeout(4000); */
      const url = await page.url();
      expect(url).toEqual(`${expectedUrlAfterAttemptOfBooking}`);
    } catch (error) {
      throw new Error("URL of page is not equal to expected");
    }
  },

  checkTicketDataAfterBooking: async function (
    page,
    filmForEqual,
    hallForEqual
  ) {
    try {
      const chosenFilmAfterBooking = ".ticket__info .ticket__title";
      const chosenFilmTextAfterBooking = await page.$eval(
        chosenFilmAfterBooking,
        (el) => el.textContent
      );
      expect(chosenFilmTextAfterBooking).toEqual(filmForEqual);
      const chosenHallAfterBooking = ".ticket__details.ticket__hall";
      const chosenHallTextAfterBooking = await page.$eval(
        chosenHallAfterBooking,
        (el) => el.textContent
      );
      expect(chosenHallTextAfterBooking).toEqual(hallForEqual);
    } catch (error) {
      throw new Error("Check ticket after booking is failed");
    }
  },

  showCode: async function (page) {
    try {
      await page.waitForSelector(".acceptin-button", { timeout: 60000 });
      const [codeButton] = await page.$x(
        '//button[contains(text(),"Получить код бронирования")]'
      );
      await codeButton.click();
      await page.waitForNavigation();
    } catch (error) {
      throw new Error("Press on button Show code is failed");
    }
  },

  codeIsVisible: async function (page) {
    try {
      await page.waitForSelector(".ticket__info-qr", { timeout: 60000 });
    } catch (error) {
      throw new Error("Code can not be shown");
    }
  },
};
