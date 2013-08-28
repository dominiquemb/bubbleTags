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

        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script type="text/javascript" src="jquery.bubbletags.js"></script>
        <link rel="stylesheet" type="text/css" href="bubbletags.css" />
        <script type="text/javascript">
                $(document).ready(function() {
                        $('.input').bubbleTags({
                                container: $('.container'),
                                /* Everything below is optional and can be removed without breaking anything. */
                                classes: ['some', 'example','classes'], // Optional classes to add to each tag.
                                onDeleteTag: function() {
                                        // Optional.
                                        // This is called when a tag is "closed" or removed from the DOM by clicking on the "x".
                                },
                                onNewTag: function() {
                                        // Optional.
                                        // This is called when a new tag is generated.
                                },
                                onSubmit: function() {
                                        // Optional.
                                        // This is called when you hit enter or submit a new tag, even if the tag is not generated.
                                },
                                hiddenInput: $('<input>').addClass('demo') // Optional. Pass in a jquery object that will be used as the template for hidden input form fields.
                        });


                        $('.input').keydown(function(evt) {
                                if (evt.which === 3) {
                                      $('.input').submitTag();
                                }
                        });
        </script>
        
        
        <p>Type something here and hit enter.  It will show up as a bubbleTag filter.</p>
        <input class="input" />
        <div class="container">&nbsp;</div>
