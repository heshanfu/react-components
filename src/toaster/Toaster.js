import React from 'react/addons';
import cx from 'classnames';
const { CSSTransitionGroup: ReactCSSTransitionGroup, cloneWithProps } = React.addons;

const Toaster = React.createClass({

  propTypes: {
    children: React.PropTypes.node.isRequired,
    attachTo: React.PropTypes.string.isRequired,
    transitionGroup: React.PropTypes.shape({
      transitionName: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.object
      ]).isRequired
    }).isRequired,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      transitionGroup: {}
    };
  },

  componentWillMount() {
    this.appendToaster();
    this.renderToaster();
  },

  componentDidMount() {
    const { position } = this.toaster.style;
    if (process.env.NODE_ENV !== 'production' && (position !== 'relative' && position !== 'absolute')) {
      console.warn('Toaster\'s parent node should have "position: relative/absolute"');
    }
  },

  componentWillUnmount() {
    this.removeToaster();
  },

  getTranslationStyle(i) {
    // const { duration, ease } = this.props.moveTransition;
    // const transition = `transform ${duration / 1000}s ${ease || ''}`;
    return {
      transform: `translate3d(0,${100 * i}%,0)`,
      position: 'absolute',
      top: 0,
      right: 0
      // WebkitTransition: transition, //THESE WOULD OVERWRITE CSS TRANSITIONS...
      // transition
    };
  },

  getToasts() {
    const { children, transitionGroup } = this.props;
    const className = transitionGroup.transitionName;
    return React.Children.map(children, (el, i) => {
      return (
        <div className={className} style={this.getTranslationStyle(i)} key={el.key}>
          {cloneWithProps(el, { uniqueKey: el.key })}
        </div>
      );
    });
  },

  appendToaster() {
    this.toaster = document.getElementById(this.props.attachTo);
  },

  removeToaster() {
    if (this.toaster) {
      this.toaster.innerHTML = ''; // stupid??
    }
  },

  getToaster() {
    const { style: styleProp, id, className } = this.props;
    const style = {
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      ...styleProp
    };

    return (
      <div className={cx('toaster', className)} {...{ style, id }}>
        <ReactCSSTransitionGroup {...this.props.transitionGroup}>
          {this.getToasts()}
        </ReactCSSTransitionGroup>
      </div>
    );
  },

  renderToaster() {
    React.render(this.getToaster(), this.toaster);
  },

  render() {
    return null;
  },

  componentDidUpdate() {
    this.renderToaster();
  }

});

export default Toaster;
