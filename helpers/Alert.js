class Alert
{
    constructor(messages,type)
    {
        this._messages = messages;
        this._type = type;
    }


    get messages()
    {
        return this._messages;
    }


    set messages(messages)
    {
        return this._messages = messages;
    }

    get type()
    {
        return this._type;
    }

    set type(type)
    {
        return this._type = type
    }

    // template alert 
    appendTemplate()
    {

        let alert = document.createElement('div');
        alert.setAttribute('class', `alert alert-${this.type} alert-dismissible fade show`);
        alert.setAttribute('role', 'alert');
        alert.innerHTML = 
            `${this.messages.map((e)=>{
                return `<p>${e}</p>`;
            })}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>`

        return alert;
    }


}