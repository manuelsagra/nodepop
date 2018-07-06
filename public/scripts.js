/* eslint-disable */
var token;
$(document).ready(function() {
    $('#search-box').hide();

    $('#login-btn').on('click', function() {
        $.ajax({
            url: '/apiv1/users/authenticate',
            method: 'POST',
            data: {
                email: $('#email').val(),
                password: $('#password').val()
            },
            success: function(data) {
                if (data.success) {
                    token = data.token;

                    $('#login-box').hide();
                    $('#search-box').show();

                    getTags();

                    searchAds();
                } else {
                    alert(data.error);
                }
            }
        });
    });

    $('#search-btn').on('click', function() {
        searchAds();       
    });

    $('input[name=price-type]').on('change', function() {
        $('#price-from').hide();
        $('#price-to').hide();

        switch($('input[name=price-type]:checked').val()) {
            case '':
                break;

            case 'exact':
            case 'gte':
                $('#price-from').show();
                break;

            case 'lte':
                $('#price-to').show();
                break;

            case 'range':
                $('#price-from').show();
                $('#price-to').show();
                break;
        }
    });
});

function getTags() {
    $.ajax({
        url: '/apiv1/ads/tags',
        method: 'GET',
        data: {
            token: token
        },
        success: function(data) {
            if (data.success) {
                var opt = '<option value="" selected>Any</option>';
                $.each(data.result, function(k, v) {
                    opt += '<option value="' + v + '">' + v + '</option>';
                });
                $('#tag').html(opt);
            } else {
                alert(data.error);
            }
        }
    })
}

function searchAds() {
    $('#results').html('<div class="alert alert-info text-center">Searching...</div>');
    $.ajax({
        url: '/apiv1/ads',
        method: 'GET',
        data: {
            token: token,
            name: $('#name').val(),
            price: getPrice(),
            selling: $('input[name=selling]:checked').val(),
            tag: $('#tag').val(),
            sort: 'name'
        },
        success: function(data) {
            if (data.success) {
                if (data.result.length == 0) {
                    $('#results').html('<div class="alert alert-warning text-center">No results found</div>');
                } else {
                    $('#results').html('<div class="row">');
                    $.each(data.result, function(k, v) {
                        $('#results .row').append('<div class="col-md-4 mb-3"><div class="card">' + 
                            '<div class="ad-img" style="background-image: url(\'' + v.photo + '\')"></div>' +
                            '<div class="card-body"><h5 class="card-title">' + v.name + '</h5>' + 
                            '<p>$' + v.price + '</p>' + 
                            '<div>' + showTags(v.tags) + '</div>' + 
                            '<div class="text-right text-primary small">' + (v.selling ? 'FOR SALE' : 'WANTED') + '</div>' + 
                            '</div></div></div>');
                    });
                }
            } else {
                alert(data.error);
            }
        }
    }); 
}

function showTags(tags) {
    var t = '';
    if (tags && tags.length > 0) {
        $.each(tags, function(k, v) {
            t += '<span class="badge badge-primary small">' + v + '</span> ';
        });
    }
    return t;
}

function getPrice() {
    switch($('input[name=price-type]:checked').val()) {
        case '':
            return '';

        case 'exact':
            return $('#price-from').val();

        case 'gte':
            return $('#price-from').val() + '-';

        case 'lte':
            return '-' + $('#price-to').val();
            break;

        case 'range':
            return $('#price-from').val() + '-' + $('#price-to').val();
            break;
    }
}