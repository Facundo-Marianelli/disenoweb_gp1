$(document).ready(function() {
    let selectedReference = null;
    let selectedName = null;
    let matches = 0;

    const $references = $('.reference');
    const $names = $('.name');
    const totalMatches = $references.length;

    function checkMatch() {
        if (selectedReference && selectedName) {
            if ($(selectedReference).data('id') === $(selectedName).data('id')) {
                $(selectedReference).css('background-color', '#c8e6c9');
                $(selectedName).css('background-color', '#c8e6c9');
                matches++;
                if (matches === totalMatches) {
                    setTimeout(showModal, 500); // Mostrar el modal después de un breve retraso
                }
            } else {
                $(selectedReference).css('background-color', '#ffcdd2');
                $(selectedName).css('background-color', '#ffcdd2');
            }
            setTimeout(() => {
                $(selectedReference).removeClass('selected');
                $(selectedName).removeClass('selected');
                selectedReference = null;
                selectedName = null;
            }, 1000);
        }
    }

    function showModal() {
        $('#modal').show();
    }

    $references.on('click', function() {
        if (selectedReference) {
            $(selectedReference).removeClass('selected');
        }
        selectedReference = this;
        $(selectedReference).addClass('selected');
        checkMatch();
    });

    $names.on('click', function() {
        if (selectedName) {
            $(selectedName).removeClass('selected');
        }
        selectedName = this;
        $(selectedName).addClass('selected');
        checkMatch();
    });

    // Cerrar el modal
    $('.close').on('click', function() {
        $('#modal').hide();
    });

    // Botón para volver a la página de juegos
    $('#play-again').on('click', function() {
        window.location.href = 'https://facundo-marianelli.github.io/disenoweb_gp1/juegos2.html';
    });
});
