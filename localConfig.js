module.exports = {
    jwt: {
        secret: 'zg.J~vppLE-d329XJW{{7ZVwE6MDbH2_7hyG$m*+,d)XR^x@_z4C"d/GcF8e&L*<LfsbW.,(:d>:)f~s',
        expiresIn: '1w'
    },
    validations: {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line no-useless-escape
    }
};