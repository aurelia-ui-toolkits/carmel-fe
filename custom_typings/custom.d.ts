declare var PR;
declare var System;

declare namespace kendo {
  var jQuery: JQueryStatic;
}

declare module "*.json" {
    const value: any;
    export default value;
}
declare module "*.json!" {
    const value: any;
    export default value;
}