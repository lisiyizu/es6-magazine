import { execute } from '../../util/execute'


//热点合集
let dataRet = {}
let statement = {}


'Setting,Parallax,Master,Activity,Content,Video,Image,Action,Animation,Widget,Novel,Season,Chapter'.replace(/[^, ]+/g, function(name) {
    statement[name] = 'select * FROM ' + (name) + ' order by _id ASC';
})

/**
 * 查询单一的数据
 * @return {[type]} [description]
 */
export function oneQuery(tableName, callback) {
    execute('select * FROM ' + tableName + ' order by _id ASC', function(successRet, collectError) {
        callback(successRet, collectError);
    })
}

/**
 * 查询总数据
 */
export function dataQuery(callback) {

    //数据库表重复数据只查询一次
    if (Object.keys(dataRet).length) {
        callback(dataRet);
        return;
    }
    //ibook模式，数据库外部注入的
    if (Xut.IBooks.CONFIG) {
        callback(Xut.IBooks.CONFIG.data);
    } else {
        //查询所有数据
        execute(statement, function(successRet, collectError) {
            for (let i in successRet) {
                dataRet[i] = successRet[i];
            }
            callback(successRet, collectError);
        })
    }

}


/**
 * 删除数据
 * @type {[type]}
 */
export function dataRemove(tableName, id, success, fail) {
    var sql = 'delete from ' + tableName + ' where _id = ' + id;
    //查询所有数据
    execute(sql, function(success, failure) {
        if (success) { //成功回调
            success();
        } else if (failure) { //失败回调
            fail();
        }
    })
}
