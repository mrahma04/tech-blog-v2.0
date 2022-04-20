const { format_date } = require('../utils/helpers')

test('format_date() returns a date string', () => {
    const date = new Date('2022-04-19 23:00:00')

    expect(format_date(date)).toBe('4/19/2022')
})