function manageCookies(){
    if (document.cookie.length != 0) return
    const attr = ['Secure', 'SameSite=Strict']
    let id = 'id='+document.getElementsByName('studid')[0].value+';'
    let name = 'name='+document.getElementsByName('name')[0].value+';'
    for (let i=0; i<attr.length; i++){
        id += attr[i]+';'
        name += attr[i]+';'
    }
    document.cookie = id
    document.cookie = name
    /* For parsing cookie list
    var cookies = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value)}), {});
    */
}