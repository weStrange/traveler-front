/* @flow */

import React, { Component, cloneElement } from 'react'
import Radium from 'radium'
import { darkWhite, lightWhite } from 'material-ui/styles/colors'
import FancyBox from './FancyBox'

const styles = {
  container: {
    padding: 0,
    height: '50px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    transition: `height 0.5s ease`
  },
  containerOpen: {
    height: '500px'
  },
  handler: {
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 0,
    top: 0,
    width: `100%`,
    height: '50px',
    backgroundColor: `rgba(255,255,255,0.2)`
  },
  headerField: {
    position: 'absolute',
    left: '20%',
    top: '0%',
    transition: 'all 0.5s ease'
  },
  headerFieldOpen: {
    top: '20%',
    minWidth: '50%'
  },
  headerClosed: {
    color: darkWhite,
    fontWeight: 300,
    fontSize: '1.5em',
    fontFamily: 'Roboto, san-serif',
    letterSpacing: '1.5px',
    transition: 'all 0.5s ease'
  },
  header: {
    fontWeight: 500,
    fontSize: '2.5em',
    marginBottom: '4px'
  },
  subheader: {
    color: darkWhite,
    fontFamily: 'Roboto, san-serif',
    fontWeight: 300,
    fontSize: '1em',
    marginTop: 4
  },
  formInput: {
    position: 'absolute',
    width: '40%',
    bottom: '15%',
    right: '20%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  underlineFocusStyle: {
    border: `1.5px ${darkWhite} solid`
  },
  inputRoot: {
    transition: 'width 0.75s ease'
  },
  inputField: {
    fontSize: '1.3em',
    color: darkWhite,
    textTransform: `capitalize`,
    fontWeight: 300
  },
  hintStyle: {
    fontWeight: 300,
    fontSize: '1.3em',
    color: lightWhite
  }
}
type FormFieldProps = {
  backgroundColor: string,
  primaryColor: string,
  header: string,
  children: any
};

class FormField extends Component {
  props: FormFieldProps;
  state: {isFullWidth: boolean};
  constructor (props) {
    super(props)
    this.state = { isFullWidth: false, open: false }
    // this.handleExpand = this.handleExpand.bind(this)
    // this.handleShrink = this.handleShrink.bind(this)
  }
  decorateChildren () {
    const {isFullWidth, open} = this.state
    const { children, primaryColor } = this.props
    const offspringOnChange = children.props.onChange
    const offspringOnUpdateInput = children.props.onUpdateInput
    const callbacks = (offspringOnUpdateInput)
    ? {
      onUpdateInput: (value) => {
        if (value.length === 0 && isFullWidth) this.handleShrink()
        if (value.length > 22 && !isFullWidth) this.handleExpand()
        offspringOnUpdateInput(value)
      },
      onFocus: () => {
        this.handleExpand()
      },
      onBlur: () => {
        this.handleShrink()
      }
    }
    : {
      onChange: (e, value) => {
        if (value.length === 0 && isFullWidth) this.handleShrink()
        if (value.length > 22 && !isFullWidth) this.handleExpand()
        offspringOnChange(e, value)
      }
    }
    const offspring = cloneElement(
      children,
      {
        underlineFocusStyle: primaryColor ? {border: `1.5px ${primaryColor} solid`} : styles.underlineFocusStyle,
        inputStyle: styles.inputField,
        hintStyle: styles.hintStyle,
        style: styles.inputRoot,
        fullWidth: this.state.isFullWidth,
        ...callbacks
      })
    return offspring
  }
  handleExpand () {
    this.setState((state, props) => { return { isFullWidth: true } })
  }
  handleShrink () {
    this.setState((state, props) => { return { isFullWidth: false } })
  }
  toggleOpen () {
    this.setState((state, props) => { return {open: !state.open} })
  }
  render () {
    const {isFullWidth, open} = this.state
    const { header, children, backgroundColor, primaryColor, subheader, icon, decorateChildren } = this.props
    return (
      <div style={[styles.container, backgroundColor && {backgroundColor: backgroundColor}, open && styles.containerOpen]}>
        <FancyBox icon={icon} playAnimation={open}>
          <div style={styles.handler} onClick={() => this.toggleOpen()} />
          <div>
            <div style={[styles.headerField, open && styles.headerFieldOpen]}>
              <h1 style={[styles.headerClosed, open && styles.header, primaryColor && {color: primaryColor}]}>{ header }</h1>
              { open && <h3 style={styles.subheader}>{ subheader }</h3>}
            </div>
            { open && <div style={styles.formInput}>{ decorateChildren ? this.decorateChildren() : children }</div>}
          </div>
        </FancyBox>
      </div>
    )
  }
}
FormField.defaultProps = {
  decorateChildren: true
}
export default Radium(FormField)
