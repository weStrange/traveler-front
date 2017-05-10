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
    transition: `all 0.5s ease`
  },
  containerOpen: {
    height: '500px'
  },
  formIndicator: {
    position: 'absolute',
    top: '50%',
    left: '10%'
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
    width: '30%',
    bottom: '15%',
    right: '20%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: '70%',
    overflow: 'hidden'
  },
  underlineFocusStyle: {
    border: `1.5px ${darkWhite} solid`
  },
  inputRoot: {
    transition: 'width 0.75s ease',
    marginLeft: '24px'
  },
  inputField: {
    fontSize: '1.3em',
    color: darkWhite,
    // textTransform: `capitalize`,
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
  subheader: any,
  icon: any,
  decorateChildren: any,
  children: any,
  formOk: boolean,
  open: boolean,
  onHandlerClick: () => void
}

type FormFieldState = {
  isFullWidth: boolean,
  formOk: boolean | null
}

class FormField extends Component {
  props: FormFieldProps;
  state: FormFieldState;

  constructor (props) {
    super(props)
    this.state = { isFullWidth: false, formOk: null }
    // this.handleExpand = this.handleExpand.bind(this)
    // this.handleShrink = this.handleShrink.bind(this)
  }
  // componentWillReceiveProps (nextProp) {
  //   if (!_.isUndefined(nextProp.open)) { this.setState({ open: this.props.open }) }
  // }
  decorateChildren () {
    const { isFullWidth } = this.state
    const { children, primaryColor } = this.props
    const offspring = React.Children.map(children, (child) => {
      return cloneElement(child,
        {
          underlineFocusStyle: primaryColor ? {border: `1.5px ${primaryColor} solid`} : styles.underlineFocusStyle,
          inputStyle: styles.inputField,
          hintStyle: styles.hintStyle,
          style: styles.inputRoot,
          fullWidth: isFullWidth,
          onFocus: () => {
            this.handleExpand()
          },
          onBlur: () => {
            if (children.value > 0) this.setState({ formOk: true })
            else this.setState({ formOk: false })
            this.handleShrink()
          }
        }
        )
    }
    )
    return offspring
  }
  handleExpand () {
    this.setState((state, props) => { return { isFullWidth: true } })
  }
  handleShrink () {
    this.setState((state, props) => { return { isFullWidth: false } })
  }
  // toggleOpen () {
  //   this.setState((state, props) => { return {open: !state.open} })
  // }
  getIndicator () {
    // if input is not completed, show unset icon
    // if input is completed, show completed icon
    // can take props to overide the process (parent handle validation)
    // if (_.isUndefined(this.state.formOk)) return
    // if (this.state.formOk) return <FormDone />
    // if (!this.state.formOk) return <FormProblem />
  }
  render () {
    const {
      header,
      children,
      backgroundColor,
      primaryColor,
      subheader,
      icon,
      decorateChildren,
      open
    } = this.props
    return (
      <div style={[styles.container, backgroundColor && {backgroundColor: backgroundColor}, open && styles.containerOpen]}>
        {!open && <div style={styles.formIndicator}>{this.getIndicator()}</div>}
        <FancyBox icon={icon} playAnimation={open}>
          <div style={styles.handler} onClick={() => this.props.onHandlerClick()} />
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
// $FlowIgnore
FormField.defaultProps = {
  decorateChildren: true
}
export default Radium(FormField)
