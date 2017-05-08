/* @flow */
'use strict'

import React from 'react'
import { PropTypes } from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import _map from 'lodash/map'
import * as colors from 'material-ui/styles/colors'
import Radium from 'radium'
const styles = {
  container: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    width: '30%',
    marginBottom: '8px'
  },
  buttonText: {
    color: colors.darkWhite,
    fontSize: '1.3em',
    fontWeight: '300'
  },
  buttonInner: {
    color: colors.darkWhite
  }
}

type RadioGroupProps = {
  title: string,
  value: string,
  onChange: () => void,
  name: string,
  options: Array<any>
};

type RadioGroupState = {
  chosed: string | null
};

class RadioGroup extends React.PureComponent {
  props: RadioGroupProps;
  state: RadioGroupState;

  constructor (props: RadioGroupProps) {
    super(props)
    this.state = { chosed: null }
  }
  handleChange (e: any) {
    const value = e.currentTarget.value
    this.setState({ chosed: value })
    this.props.onChange(value)
  }
  renderButtons () {
    const { options } = this.props
    const processIcon = (iconElem) => {
      if (!iconElem) return
      const style = iconElem.props.style
      const newStyle = { ...style, color: colors.orange500 }
      return { ...iconElem, props: { ...iconElem.props, style: newStyle } }
    }
    return _map(options, (item, idx) => {
      return (
        <RadioButton
          key={idx}
          value={item.value}
          label={item.label}
          uncheckedIcon={item.checkedIcon}
          checkedIcon={processIcon(item.checkedIcon)}
          labelStyle={styles.buttonText}
          inputStyle={styles.buttonInner}
          style={styles.button}
        />
      )
    })
  }
  render () {
    return (
      <div style={styles.container}>
        <RadioButtonGroup
          valueSelected={this.props.value}
          onChange={(e) => this.handleChange(e)}
          name={this.props.name}
            >
          {this.renderButtons()}
        </RadioButtonGroup>
      </div>
    )
  }
}
export default Radium(RadioGroup)

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
    checkedIcon: PropTypes.elem,
    uncheckedIcon: PropTypes.elem
  })).isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}
/* options should have this shape
  [
    {
      label,
      value,
      icon
    }
  ] */
