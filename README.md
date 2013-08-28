bubbleTags
==========

Tags or filters that appear when a search term is entered into a field.

This plugin supports:

1. Customization of the appearance of tags.
2. Callbacks upon creation of new tags, on submission of tags (such as hitting enter in the search field), and on deletion of tags (such as when clicking the 'x' button on the tag).
3. Arbitrary classes to be added to the tag itself.
4. Arbitrary tag container that can be located anywhere on the page.
5. Customizable hidden input element, to be used for form values, for example
6. Function to trigger submission of new tag: $(container).submitTag();
7. Function to create new tag with text: $(container).addTag('some example text');
8. Function to delete already-existing tag: $(container).deleteTag( $(some-tag) );

Here is the bare minimum configuration in order to use bubbleTags:

        $(document).ready(function() {
          $('.input').bubbleTags({
                container: $('.container'),
                /* Everything below is optional and can be removed without breaking anything. */
                classes: ['some', 'example','classes'], // Optional classes to add to each tag.
                onDeleteTag: function() {
                        // Optional.
                        // This is called when a tag is "closed" or removed from the DOM by clicking on the "x".
                        $('#aloha').append('<p>onDeleteTag function triggered.</p>');
                        },
                onNewTag: function() {
                        // Optional.
                        // This is called when a new tag is generated.
                        $('#aloha').append('<p>onNewTag function triggered.</p>');
                        },
                onSubmit: function() {
                        // Optional.
                        // This is called when you hit enter or submit a new tag, even if the tag is not generated.
                        $('#aloha').append('<p>onSubmit function triggered.</p>');
                        },
                hiddenInput: $('<input>').addClass('demo') // Optional. Pass in a jquery object that will be used as the template for hidden input form fields.
        });


        $('.input').keydown(function(evt) {
                if (evt.which ===e3) {
                        $('.input').submitTag();
                }
        });
        
