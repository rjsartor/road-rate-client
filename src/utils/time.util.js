// TODO: refactor to use a time library

export const toAbbreviatedMonth = (number) => {
    let month;
    switch (number) {
        case 1:
          month = 'Jan'
          break;
        case 2:
          month = 'Feb'
          break;
        case 3:
          month = 'Mar'
          break;
        case 4:
          month = 'Apr'
          break;
        case 5:
          month = 'May'
          break;
        case 6:
          month = 'Jun'
          break;
        case 7:
          month = 'Jul'
          break;
        case 8:
          month = 'Aug'
          break;
        case 9:
          month = 'Sep'
          break;
        case 10:
          month = 'Oct'
          break;
        case 11:
          month = 'Nov'
          break;
        case 12:
          month = 'Dec'
          break;
        default:
          month = null
        }

    return month;
}

export const getElapsedTime = (createdAt) => {
    const thisDate = new Date();
        
    const date = new Date(createdAt)
    const year = date.getFullYear();
    const month = toAbbreviatedMonth((date.getMonth() + 1));
    const day = date.getDate();

    let minutes = date.getMinutes();
    let hour = date.getHours();

    //add 0 for times less than 10
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    const hourTime = hour > 12 ? `${hour - 12}:${minutes} PM ` : `${hour}:${minutes} AM `;

    const yearTime = ` - ${day} ${month} ${year}`;
    const dateString = hourTime + yearTime;

    const timePassed = thisDate - date;

    let elapsedTime;
    const convert = (ms) => {
        let d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        if (d < 1 && h < 1) {
            elapsedTime = `${m}m ago`
        } else if (d < 1 && h < 2) {
            elapsedTime = `${h}hr ago`
        } else if (d < 1 && h > 2) {
            elapsedTime = `${h}hrs ago`
        //this will need to be updated for short months
        } else if (d === 1) {
            elapsedTime = `${d} day ago`
        } else if (d > 1 && d < 31) {
            elapsedTime = `${d} days ago`
        } else if (d > 31 && d < 62) {
            elapsedTime = `1 month ago`
        }
    };

    if (timePassed) {
        convert(timePassed)
    }

    return {
        elapsedTime,
        dateString,
    }
}