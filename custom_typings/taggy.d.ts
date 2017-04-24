// declare module "taggy" {
//   export default function taggy(input: Element, options?: any);
// }

declare module "taggy" {
  function taggy(input: Element, options?: any);
  namespace taggy {}
  export = taggy;
}
