$(document).ready(function() {
    formValidation()
    console.log('READY!')
});

const formValidation = () => {
    $('[data-validation="needs-validation"]').each(function() {
        const form = $(this);
        form.submit(function(event) {
            console.log('validating')
            if (form[0].checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
                form.addClass('was-validated')
            }
        })
    })
}
