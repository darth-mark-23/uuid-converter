$(document).ready(function() {
    /* Object definitions
    ----------------------------------------------*/
    var rawInput = document.querySelector("#raw");
    var hyphenInput = document.querySelector("#hyphen");
    var hexInput = document.querySelector("#hex");

    var hyphenCopy = document.querySelector("#hyphen-copy");
    var hexCopy = document.querySelector("#hex-copy");

    var hyphenPos = [8, 12, 16, 20, 32]; // Where hyphens go in the hyphenated uuid

    /* Function definitions
    ----------------------------------------------*/
    function updateInputFields( source ) {
        let newVal = source.value;
        let hyphenFinal = "";
        let lastHyphen = 0;
        let hyphenVal = new Array;

        // Start by grabbing the text that just changed, because this is what we want to keep (remove hyphens and "0x" and re-add later)
        newVal = newVal.split("-").join("");
        newVal = newVal.split("0x").join("");

        // Construct a hyphenated number by creating an array of slices and joining them with hyphens
        for ( i = 0; i < (hyphenPos.length); i++ ) {
            // Create a new element in the array that contains a slice of the new value
            hyphenVal[i] = newVal.slice( lastHyphen, hyphenPos[i] );

            // Update our last hyphen position so we move through the string each iteration
            lastHyphen = hyphenPos[i];
        }

        // Join the array back into a new value
        hyphenFinal = hyphenVal.join("-");

        // Update raw field
        rawInput.value = newVal;

        // Update hyphen field -- It would be nice to check if this is our source first, but that is proving tricky
        hyphenInput.value = hyphenFinal.toLowerCase();

        // Update Hex field
        hexInput.value = "0x" + newVal.slice(0, 32).toUpperCase();
    }

    // Pass "this" to the update function so we can know where the source of the change was
    hyphenInput.updated = function() {
        updateInputFields( this );
    }

    // Ditto for these ones
    hexInput.updated = hyphenInput.updated;
    rawInput.updated = hyphenInput.updated;

    function hyphenCopyClicked() {
        copyInput( hyphenInput );
    }

    function hexCopyClicked() {
        copyInput( hexInput );
    }

    // Do the copying
    function copyInput( field ) {
        field.select();
        document.execCommand("copy");
    }

    function selectSelf() {
        this.select();
    }

    /* Listeners
    ----------------------------------------------*/
    rawInput.addEventListener("input", rawInput.updated );
    hyphenInput.addEventListener("input", hyphenInput.updated );
    hexInput.addEventListener("input", hexInput.updated );

    hyphenCopy.addEventListener("click", hyphenCopyClicked );
    hexCopy.addEventListener("click", hexCopyClicked );

    hyphenInput.addEventListener("focus", selectSelf );
    hexInput.addEventListener("focus", selectSelf );
});
