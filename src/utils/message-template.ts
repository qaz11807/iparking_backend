

export const enterMessage = (deviceToken: string) => {
    return {
        notification: {
            title: '確認入場',
            body: '請開啟應用程式並確認入場',
        },
        token: deviceToken,
    };
};

export const exitMessage = (deviceToken: string) => {
    return {
        notification: {
            title: '付款成功',
            body: '請開啟應用程式並於10分鐘內出場',
        },
        token: deviceToken,
    };
};

export const doneMessage = (deviceToken: string) => {
    return {
        notification: {
            title: '確認入場',
            body: '請開啟應用程式並確認入場',
        },
        token: deviceToken,
    };
};

