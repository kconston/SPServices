/**
 * Created by Marc D Anderson on 11/23/2015.
 */

/* Setup variables */
var testList = {};
testList.Name = new Date().toString();
testList.Description = "This is the test description.";

QUnit.test( "SPGetCurrentUser", function( assert ) {
    var currentUser = $().SPServices.SPGetCurrentUser();
    assert.ok( currentUser !== undefined, "Passed! SPCurrentUser =::" + currentUser + "::" );
});


QUnit.test( "SPGetCurrentSite", function( assert ) {
    var currentSite = $().SPServices.SPGetCurrentSite();
    assert.ok( currentSite !== undefined, "Passed! SPCurrentSite =::" + currentSite + "::" );
});

QUnit.test( "AddList", function(assert) {

    assert.expect(2);
    var done = assert.async();

    var p = $().SPServices({
        operation: "AddList",
        listName: testList.Name,
        description: testList.Description,
        templateID: 100
    });
    p.done(function(){

        var listInfo = $(p.responseXML).find("List");
        equal(listInfo.attr("Title"), testList.Name, "Title of list should be should be ::" + testList.Name);
        equal(listInfo.attr("Description"), testList.Description, "Description of list should be should be ::" + testList.Description);
        done();

    });

});

QUnit.test( "DeleteList", function(assert) {

    assert.expect(1);
    var done = assert.async();

    var p = $().SPServices({
        operation: "DeleteList",
        listName: testList.Name
    });
    p.done(function(){

        var listInfo = $(p.responseXML).find("DeleteListResponse");

        equal(listInfo.length, 1, "List deleted successfully" + testList.Name);
        done();

    });

});

/*
QUnit.test( "UpdateList", function( assert ) {
    var done = assert.async();
    var input = $( "#test-input" ).focus();
    setTimeout(function() {
        assert.equal( document.activeElement, input[0], "Input was focused" );
        done();
    });
});
*/





/* SUPPORTING FUNCTIONS */
/*
function AddList() {

    var deferred = $.Deferred();

    var p = $().SPServices({
        operation: "AddList",
        listName: testList.Name,
        description: testList.Description,
        templateID: 100
    });

    p.done(function() {
        deferred.resolveWith(p);
    });

    return deferred.promise;

}


function UpdateList() {

    var deferred = $.Deferred();

    var fieldsToUpdate = '<Fields>';
    fieldsToUpdate += '<Method ID="1"><Field Type="Text" Name="ProjectName" DisplayName="Project name"><Default>Boo</Default></Field></Method>';
    fieldsToUpdate += '</Fields>';

    var p = $().SPServices({
        operation: "UpdateList",
        listName: testList.Name,
        updateFields: fieldsToUpdate
    });

    p.done(function() {
        deferred.resolveWith(p);
    });

    return deferred.promise;

}
*/