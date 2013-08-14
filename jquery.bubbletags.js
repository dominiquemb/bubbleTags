$.fn.bubbleTags = function (settings) {
    "use strict";

    if (typeof settings.container === "object") {
        this.keydown( function(evt) {
            var closeButton,
            tagText,
            tagHtml,
            listOfTags = [],
            repeatedTag = false,
            newTag,
            target = $(this),
            hiddenField;

            $.each(settings.container.find('input.bubbleTag_hiddenInput'), function(index, hiddenInputHtml) {
                listOfTags.push($(hiddenInputHtml).val());
            });

            if (evt.which === 13 || evt.which === 188) {
                newTag = target.val().replace(/[^a-zA-Z\s]/g, '').replace(/^\s+|\s+$/g, '').toLowerCase();

                if (newTag.length) {
                    $.each(listOfTags, function(index, existingTagValue) {
                        if (existingTagValue === newTag) {
                            repeatedTag = true;
                        }
                    });

                    if (!repeatedTag) {
                        closeButton = $('<span>').addClass('bubbleTag_close').html('x').on('click', function(evt) {
                            evt.preventDefault();

                            $(this).siblings('.bubbleTag_hiddenInput').val('');
                            $(this).parent('.bubbleTag_item').remove();
                            if (typeof settings.onDeleteTag === "function") {
                                settings.onDeleteTag.call(target, settings.container, $(this).val());                            }

                            if (settings.container.find('.bubbleTag_item').length === 0) {
                                settings.container.removeClass('active');
                            }                        });

                        tagText = $('<a>').addClass('bubbleTag_text').html(newTag);
                        tagHtml = $('<span>').addClass('bubbleTag_item').data('tag', newTag).append(tagText).               append(closeButton);
                        if (typeof settings.hiddenField === "object") {
                            hiddenField = settings.hiddenField.clone().addClass('bubbleTag_hiddenInput').data('tag',newTag).css('display','none').val(newTag);
                        }

                        else {
                            hiddenField = $('<input>').attr('class', 'bubbleTag_hiddenInput').data('tag', newTag).          css('display','none').val(newTag);
                        }

                        if (typeof settings.classes === "object") {
                            $.each(settings.classes, function(index, classText) {
                                tagHtml.addClass(classText);
                            });
                        }

                        tagHtml.append(hiddenField);
                        settings.container.append(tagHtml);

                        settings.container.addClass('active');

                        if (typeof settings.onNewTag === "function") {
                            settings.onNewTag.call(target, settings.container, tagHtml, newTag);
                        }
                    }
                }

                if (typeof settings.onSubmit === "function") {
                    settings.onSubmit.call(target, settings.container);
                }

                setTimeout($.proxy(
                        function() {
                            target.val('');
                        }, this
                    ),
                200);
            }
        });
    }
}
