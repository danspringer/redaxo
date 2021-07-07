// save & restore sidebar panel toggle status via localstorage
$(document).on('rex:ready', function (event, viewRoot) {
    var $sidebar = viewRoot.is('#rex-page-content-edit') && viewRoot.find('#rex-js-main-sidebar'),
        sidebar_status,
        $sections;
    function store_sidebar_status () {
        sidebar_status = [];
        $sections.each(function (k, v) {
            sidebar_status.push($(v).find('div.collapse').hasClass('in').toString());
        });
        localStorage.setItem('structure_content_sidebar_status', JSON.stringify(sidebar_status));
    }
    if ($sidebar.length) {
        sidebar_status = localStorage.getItem('structure_content_sidebar_status');
        $sections = $sidebar.children('section');
        if (!sidebar_status) {
            store_sidebar_status();
        }
        else {
            sidebar_status = JSON.parse(sidebar_status);
            if (sidebar_status.length !== $sections.length) {
                store_sidebar_status();
            }
            else {
                $sections.each(function (k, v) {
                    var $panel = $(v).find('div.collapse'),
                        panel_is_visible = $panel.hasClass('in');
                    if (panel_is_visible.toString() !== sidebar_status[k]) {
                        if (panel_is_visible) {
                            $panel.collapse('hide');
                        }
                        else {
                            $panel.collapse('show');
                        }
                    }
                });
            }
        }
        $sidebar.on('shown.bs.collapse hidden.bs.collapse', function() {
            store_sidebar_status ();
        });
    }

// Search Slices
    $('.slice-search-box').on('keyup', function() {
        var dropdownId = $(this).closest('ul').attr('id');
        var searchTerm = $(this).val().toLowerCase();
        var searchTermOriginal = $(this).val();

        $('#' + dropdownId + ' li').each(function() {
            var moduleName = $(this).text();
            //console.log(moduleName + ' | Suchbegriff: '+searchTerm);

            if (moduleName.toLowerCase().indexOf(searchTerm) >= 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        }); /* EoF each */

        var n = $('#' + dropdownId + ' li:visible').length;
        $('#' + dropdownId + ' .qty-live').html(n);
        if (n == 1) {
            $('#' + dropdownId + ' .slice-search-plural').hide();
            $('#' + dropdownId + ' .slice-search-singular').show();
        } else {
            $('#' + dropdownId + ' .slice-search-plural').show();
            $('#' + dropdownId + ' .slice-search-singular').hide();
        }
        var preText = $('#' + dropdownId + ' .rex-slice-search-lang-var').text();
        $('#' + dropdownId + ' .query-live').html(' ' + preText + ' <strong><em>' + searchTermOriginal + '</em></strong>');

        if (searchTerm == "") {
            $('#' + dropdownId + ' .query-live').html('');
        }

    });
// End Search Slices

});
// End on rex::ready
