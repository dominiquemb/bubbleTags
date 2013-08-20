$.fn.bubbleTags = function (settings) {
    "use strict";
    var target = $(this),
     
    bubbleTagsSubmit = function() {
        if (this.data('bubbleTags')) {
            if (typeof settings.onSubmit === "function") {
                settings.onSubmit.call(target, settings.container);
            }

            var newTag = target.val();

            if (settings.filterOut) {
                newTag = newTag.replace(settings.filterOut, '').toLowerCase();
            }

            target.addTag(newTag);

            setTimeout($.proxy(
                    function() {
                        target.val('');
                    }, this
                ), 
            200);
        }
    },

    bubbleTagsDeleteTag = function(tag) {
        if (this.data('bubbleTags')) {
            if (typeof tag === "object") {
                tag.siblings('.bubbleTag_hiddenInput').val('');
                tag.parent('.bubbleTag_item').remove();

                if (typeof settings.onDeleteTag === "function") {
                    settings.onDeleteTag.call(target, settings.container, tag.val());
                }

                if (settings.container.find('.bubbleTag_item').length === 0) {
                    settings.container.removeClass('active');
                }
            }
        }
    },

    bubbleTagsAddTag = function(newTag) {
        if (this.data('bubbleTags')) {
            var closeButton, 
            tagText, 
            tagHtml, 
            listOfTags = [],
            repeatedTag = false,
            hiddenField;

            $.each(settings.container.find('input.bubbleTag_hiddenInput'), function(index, hiddenInputHtml) {
                listOfTags.push($(hiddenInputHtml).val());
            });

            if (newTag.length) {
                $.each(listOfTags, function(index, existingTagValue) {
                    if (existingTagValue === newTag) {
                        repeatedTag = true;
                    }
                });

                if (!repeatedTag) {
                    closeButton = $('<span>').addClass('bubbleTag_close').html('x').on('click', function(evt) {
                        evt.preventDefault();
                        target.deleteTag( $(this) );
                    });

                    tagText = $('<a>').addClass('bubbleTag_text').html(newTag);
                    tagHtml = $('<span>').addClass('bubbleTag_item').data('tag', newTag).append(closeButton).append(tagText);
                    if (typeof settings.hiddenField === "object") {
                        hiddenField = settings.hiddenField.clone().addClass('bubbleTag_hiddenInput').data('tag',newTag).css('display','none').val(newTag);
                    }

                    else {
                        hiddenField = $('<input>').attr('class', 'bubbleTag_hiddenInput').data('tag', newTag).css('display','none').val(newTag);
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
        }
    };

    $.fn.submitTag = bubbleTagsSubmit;
    $.fn.addTag = bubbleTagsAddTag;
    $.fn.deleteTag = bubbleTagsDeleteTag;
   
    this.data('bubbleTags', true);

    return this;
}
