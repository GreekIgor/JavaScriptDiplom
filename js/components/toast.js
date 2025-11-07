import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function addTippy(elem, description)
{
  tippy(elem, {
  content: description,
});
}