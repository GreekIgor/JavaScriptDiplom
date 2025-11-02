
function initValidate()
{
    const validator = new window.JustValidate('.questions__form')
    validator.addField('#name', [
        {
        rule : 'required' 
        },
        {
        rule: 'minLength',
        value: 3
        },
        {
         rule: 'maxLength',
         value: 20   
        }
    ])
    .addField('#email', [
        {
            rule: 'required'
        },
        {
            rule: 'email'
        }
    ])
    .addField('#agree', [
        {
            rule: 'required'
        }
    ])
}

export {initValidate}