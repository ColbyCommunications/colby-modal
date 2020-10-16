# colby-modal

A react component to show a bootstrap modal.

## Props

| Name          | Description                                                                                                           | Type     | Default Value |
| ------------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| trigger       | Any React component which will trigger the modal on click.                                                            | node     | ""            |
| title         | Header title                                                                                                          | node     | ""            |
| size          | Width of the modal. Options: "small", "normal", "large"                                                               | string   | 'normal'      |
| onTop         | Show modal window on top of everything else on the page.                                                              | bool     | false         |
| beforeShow    | A function that will run before the modal renders. Promises will show a spinner before resolving then show the modal. | function | null          |
| afterShow     | A function that will run after the modal is rendered.                                                                 | function | null          |
| beforeClose   | A function that will run before the modal closes. Promises will cause the modal to remain open until resolved.        | function | null          |
| afterClose    | A function that will run after the modal closes.                                                                      | function | null          |
| contentStyle  | Style of the modal header.                                                                                            | object   | {}            |
| headerStyle   | Style of the modal header.                                                                                            | object   | {}            |
| bodyStyle     | Style of the modal body.                                                                                              | object   | {}            |
| formAutoFocus | Will focus on the first field of a form when true.                                                                    | bool     | false         |
| scrollable    | Creates internal scroll bar for modal                                                                                 | bool     | false         |

## Usage

### Simple Modal

```javascript
import React from 'react';
import Modal from 'colby-modal';

export default () => (
    <Modal
        trigger={
            <button type="button" className="btn btn-default">
                Open Modal
            </button>
        }
        title="I am a modal"
    >
        <div>Modal content</div>
    </Modal>
);
```

### Link As Trigger

```javascript
import React from 'react';
import Modal from 'colby-modal';

export default () => (
    <Modal trigger={<a href="#">Open Modal</a>} title="I am a modal">
        <div>Modal content</div>
    </Modal>
);
```

### Different Sizes

```javascript
import React from 'react';
import Modal from 'colby-modal';

export default () => (
    <div>
        <Modal
            trigger={
                <button type="button" className="btn btn-default">
                    Open Small Modal
                </button>
            }
            title="I am a small modal"
            size="small"
        >
            <div>Modal content</div>
        </Modal>{' '}
        <Modal
            trigger={
                <button type="button" className="btn btn-default">
                    Open Medium Modal
                </button>
            }
            title="I am a medium modal"
            size="medium"
        >
            <div>Modal content</div>
        </Modal>{' '}
        <Modal
            trigger={
                <button type="button" className="btn btn-default">
                    Open Large Modal
                </button>
            }
            title="I am a large modal"
            size="large"
        >
            <div>Modal content</div>
        </Modal>
    </div>
);
```

### Different Styles

```javascript
import React from 'react';
import Modal from 'colby-modal';

export default () => (
    <Modal
        trigger={
            <button type="button" className="btn btn-default">
                Open Modal
            </button>
        }
        title="I am a modal"
        headerStyle={{ backgroundColor: '#090', color: '#fff' }}
        bodyStyle={{ backgroundColor: '#cfc' }}
    >
        <div>Modal content</div>
    </Modal>
);
```
