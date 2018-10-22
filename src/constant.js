/* global process */
import Config from 'react-native-config';


export default {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DISABLE_YELLOW_BOX: Boolean(Config.DISABLE_YELLOW_BOX),
    API_BASE_URL: Config.API_BASE_URL || 'https://api.staging.comfreight.com/v1',
    API_KEY_COMFREIGHT: Config.API_KEY_COMFREIGHT || 'xb6QENw5BIVNapceOHX0W6OMGMnIoolxsr8ahCDU',
};
