/**
 * Created by Ian on 2016/1/16.
 */
var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {
    backToThread:function(){
        ChatAppDispatcher.dispatch({
            type:ActionTypes.CLICK_BACK_TO_THREAD
        })
    },
    showMessage:function(){

    }
}