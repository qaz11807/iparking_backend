

const formatDate = (currentDatetime: Date)=>{
    const year = currentDatetime.getFullYear();
    const month = (currentDatetime.getMonth()+1).toString().padStart(2, '0');
    const date = currentDatetime.getDate().toString().padStart(2, '0');
    const hour = currentDatetime.getHours().toString().padStart(2, '0');
    const min = currentDatetime.getMinutes().toString().padStart(2, '0');
    const sec = currentDatetime.getSeconds().toString().padStart(2, '0');
    return year + '/' + month + '/' + date+ ' ' + hour+ ':' + min+ ':' + sec;
};

export const generateFormatedDate = (currentDatetime: Date) => formatDate(currentDatetime);
