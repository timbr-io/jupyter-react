export default function( cell ) {
    var widget_area = document.createElement('div');
    widget_area.classList.add('widget-area');
    //widget_area.style.display = 'none';

    this.widget_area = widget_area;

    var widget_prompt = document.createElement('div');
    widget_prompt.classList.add('prompt');
    widget_area.appendChild(widget_prompt);

    var widget_subarea = document.createElement('div');
    widget_subarea.classList.add('widget-subarea');
    widget_area.appendChild(widget_subarea);

    this.widget_subarea = widget_subarea;

    if (cell.input) {
        cell.input.after(widget_area);
    } else {
        throw new Error('Cell does not have an `input` element.  Is it not a CodeCell?');
    }
}
