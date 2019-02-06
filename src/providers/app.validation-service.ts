export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Campo requerido.',
      'invalidDniCif': 'Lo introducido no es un DNI ni CIF válido.',
      'invalidFecha': 'La fecha debe cumplir el formato YYYY-mm-dd .',
      'invalidMes': 'La fecha debe cumplir el formato YYYY-mm .',
      'invalidHora': 'La hora debe cumplir el formato HH:mm:ss .',
      'invalidDecimal': 'El campo acepta sólo números con o sin decimales (máximo 3, por ejemplo: 3.000).',
      'invalidPhone': 'Teléfono no válido.',
      'invalidCorreo': 'Correo no válido.',
      'clavesNotMatch': 'Las contraseñas no coinciden.',
      'invalidPDF': 'El fichero tiene que ser un PDF.',
      'invalidEntero': 'Sólo se admiten números enteros.',
      'invalidImagen': 'El fichero tiene que ser un JPG o PNG.',
      'invalidSinEspacios': 'El campo no puede tener espacios por inicio o el fin.',
      'minlength': `Longitud mínima: ${validatorValue.requiredLength}`
    };
    return config[validatorName];
  }

  static ficheroValidator(control) {
    if (!control.value || (control.value.match(/\.(pdf)$/)) ) {
      return null;
    } else {
      return {'invalidPDF': true};
    }
  }

  static requeridoValidator(control) {
    if (control.value === 'undefined' ||
      control.value === null ||
      control.value.toString().trim() === '' ||
      control.value.toString().trim().length === 0) {
      return {'required': true};
    } else {
      return null;
    }
  }

  static imagenValidator(control) {
    if (control.value.match(/\.(JPG|JPEG|PNG|jpg|jpeg|png)$/) ) {
      return null;
    } else {
      return {'invalidImagen': true};
    }
  }

  static vacioValidator(control) {
    if (control.value.trim().match(/^[^]+$/) ) {
      return null;
    } else {
      return {'required': true};
    }
  }

  static fechaValidator(control) {
    if (!control.value || (control.value && control.value.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) ) {
      return null;
    } else {
      return {'invalidFecha': true};
    }
  }

  static anyomesValidator(control) {
    if (!control.value || (control.value && control.value.match(/^[0-9]{4}-(0[1-9]|1[0-2])$/)) ) {
      return null;
    } else {
      return {'invalidMes': true};
    }
  }

  static horaValidator(control) {
    //  /(^[0-9]{2})(:{1})([0-9]{2})(:{1})([0-9]{2})$/
    if (!control.value || (control.value && control.value.match(/(^[0-9]{2})(:{1})([0-9]{2})((:{1})([0-9]{2}))?$/)) ) {
      return null;
    } else {
      return {'invalidHora': true};
    }
  }

  static decimalValidator(control) {
    if (!control.value || (control.value && control.value.toString().match(/^\d+(\.\d{1,3})?$/))) {
      return null;
    } else {
      return {'invalidDecimal': true};
    }
  }

  static isNullOrWhitespace(control) {
    if (typeof control.value === 'undefined' || control.value == null) {
      return true;
    }

    if (control.value.replace(/\s/g, '').length > 1) {
      return true;
    }
    return {'required': true};
  }

  static dniCifValidator(control) {
    if ( !control.value || (control.value && control.value.match(/^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d[0-9,A-J]$/)) || (control.value && control.value.match(/^[0-9]{7,8}[A-Za-z]$/)) ) {
      return null;
    } else {
      return {'invalidDniCif': true};
    }
  }

  static dniValidator(control) {

  }

  static siEscribeNoVacioValidator(control) {
    if ( !control.value || (control.value && control.value.match(/^[-_a-zA-Z0-9]+(\s+[-_a-zA-Z0-9]+)*$/)) ) {
      return null;
    } else {
      return {'invalidSinEspacios': true};
    }
  }

  static correoValidator(control) {
    if ( !control.value || (control.value && control.value.match(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/)) ) {
      return null;
    } else {
      return {'invalidCorreo': true};
    }
  }

  static phoneValidator(control) {
    if ( !control.value || (control.value && control.value.match(/^((\+?34([ \t|\-])?)?[9|6|7]((\d{1}([ \t|\-])?[0-9]{3})|(\d{2}([ \t|\-])?[0-9]{2}))([ \t|\-])?[0-9]{2}([ \t|\-])?[0-9]{2})$/)) ) {
      return null;
    } else {
      return {'invalidPhone': true};
    }
  }

  static numeroEnteroValidator(control) {
    if (!control.value || (control.value && control.value.match(/^\d+$/)) ) {
      return null;
    } else {
      return {'invalidEntero': true};
    }
  }

}
