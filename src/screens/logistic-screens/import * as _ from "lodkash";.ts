import * as _ from "lodash";

function recurse(ussdTextInput: string[]) {
  if (_.last(ussdTextInput) === "B") {
    console.log('recurse')
    return "Back";
  }

  if (
    ussdTextInput.length >= 2 &&
    _.nth(ussdTextInput, -1) !== "B" &&
    _.nth(ussdTextInput, -2) !== "B"
  ) {
    console.log("Recursive");
    recurse([...ussdTextInput, "B"]);
  }
}

recurse(['89','B']);
