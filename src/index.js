/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Loader from '@colbycommunications/colby-loader';
import $ from 'jquery';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import './modal.css';

export default class Modal extends React.Component {
    static propTypes = {
        /** Any React component which will trigger the modal on click. <i>e.g.</i> <button>Open Modal</button> */
        trigger: PropTypes.node,

        /** Header title */
        title: PropTypes.node,

        /** Width of the modal. Options: "small", "normal", "large"  */
        size: PropTypes.string,

        /** Show modal window on top of everything else on the page. <i>e.g.</i> Over a spinner */
        onTop: PropTypes.bool,

        /** A function that will run before the modal renders. <br> Promises will show a spinner before resolving then show the modal. */
        beforeShow: PropTypes.func,

        /** A function that will run after the modal is rendered. */
        afterShow: PropTypes.func,

        /** A function that will run before the modal closes. <br> Promises will cause the modal to remain open until resolved. */
        beforeClose: PropTypes.func,

        /** A function that will run after the modal closes. */
        afterClose: PropTypes.func,

        /** Style of the modal content. */
        contentStyle: PropTypes.object,

        /** Style of the modal header. */
        headerStyle: PropTypes.object,

        /** Style of the modal body. */
        bodyStyle: PropTypes.object,

        /** Will focus on the first field of a form when true. */
        formAutoFocus: PropTypes.bool,

        // eslint-disable-next-line react/require-default-props
        children: PropTypes.node,

        scrollable: PropTypes.bool,
    };

    static defaultProps = {
        trigger: '',
        title: '',
        size: 'normal',
        onTop: false,
        beforeShow: null,
        afterShow: null,
        beforeClose() {},
        afterClose: null,
        contentStyle: {},
        headerStyle: {},
        bodyStyle: {},
        formAutoFocus: false,
        scrollable: false,
    };

    state = {
        isOpen: false,
        loading: false,
    };

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    open = () => {
        this.openModal();
    };

    close = () => {
        this.handleClose();
    };

    openModal = event => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        return new Promise(resolve => {
            if (this.props.beforeShow) {
                // Don't show loader if beforeShow is really fast
                const handle = setTimeout(() => {
                    this.setState({ loading: true });
                }, 100);

                Promise.resolve()
                    .then(() => this.props.beforeShow())
                    .then(() => {
                        clearTimeout(handle);
                        this.setState({ isOpen: true, loading: false }, resolve);
                    })
                    .catch(() => {
                        clearTimeout(handle);
                        this.setState({ loading: false });
                    });
            } else {
                this.setState({ isOpen: true }, resolve);
            }
        });
    };

    handleClose = () => {
        Promise.resolve(this.props.beforeClose())
            .then(() => {
                if (this.mounted) {
                    this.setState({ isOpen: false });
                }

                if (this.props.afterClose) {
                    this.props.afterClose();
                }
            })
            .catch(() => {});
    };

    afterOpen = () => {
        if (this.props.afterShow) {
            this.props.afterShow();
        }

        // focus on the first form element
        if (this.props.formAutoFocus) {
            $(this.body)
                .find('input[type!="hidden"],textarea')
                .first()
                .focus();
        }
    };

    render() {
        const modalStyle = {
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: this.props.onTop ? 2001 : 1050,
            },
            content: this.props.contentStyle,
        };

        let sizeClass = '';
        if (this.props.size === 'small') {
            sizeClass = 'modal-sm';
        } else if (this.props.size === 'large') {
            sizeClass = 'modal-lg';
        } else if (this.props.size !== 'normal') {
            modalStyle.content.width = this.props.size;
        }

        const childrenWithProps = React.Children.map(this.props.children, child => {
            // If it's just a dom element (like div) don't pass closeModal
            if (!child || typeof child.type === 'string') {
                return child;
            }

            return React.cloneElement(child, { closeModal: this.close });
        });

        return (
            <Loader loading={this.state.loading}>
                <span role="button" tabIndex={0} onClick={this.openModal}>
                    {this.props.trigger}
                </span>
                <ReactModal
                    isOpen={this.state.isOpen}
                    className={`Modal__Bootstrap modal-dialog ${sizeClass} ${this.props.scrollable ? 'modal-dialog-scrollable': ''}`}
                    closeTimeoutMS={150}
                    onRequestClose={this.handleClose}
                    shouldCloseOnOverlayClick
                    style={modalStyle}
                    onAfterOpen={this.afterOpen}
                    ariaHideApp={false}
                >
                    <div className="modal-content">
                        <div className="modal-header" style={{ borderRadius: '6px 6px 0 0', ...this.props.headerStyle }}>
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                                <span aria-hidden="true">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div
                            className="modal-body"
                            style={{ borderRadius: '0 0 6px 6px', ...this.props.bodyStyle }}
                            ref={c => {
                                this.body = c;
                            }}
                        >
                            {childrenWithProps}
                        </div>
                    </div>
                </ReactModal>
            </Loader>
        );
    }
}
