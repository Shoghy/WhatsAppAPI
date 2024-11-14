import {
  ButtonParamType,
  type BaseButtonParam,
  type BaseParam,
} from "./params";

export enum ComponentType {
  Body = "body",
  Header = "header",
  Button = "button",
}

abstract class Component {
  constructor(public readonly type: ComponentType) {}

  ToJSON(): object {
    return { type: this.type };
  }
}

type ParamBaseComponentType = ComponentType.Body | ComponentType.Header;
abstract class ParamBaseComponent extends Component {
  constructor(
    type: ParamBaseComponentType,
    public parameters: Array<BaseParam>,
  ) {
    super(type);
  }

  override ToJSON(): object {
    const obj: Dict<unknown> = {
      type: this.type,
    };

    const { parameters } = this;
    const paramsJSON: object[] = [];
    for (const p of parameters) {
      paramsJSON.push(p.ToJSON());
    }

    if (paramsJSON.length > 0) {
      obj.parameters = paramsJSON;
    }

    return obj;
  }
}

export class BodyComponent extends ParamBaseComponent {
  constructor(parameters: Array<BaseParam>) {
    super(ComponentType.Body, parameters);
  }
}

export class HeaderComponent extends ParamBaseComponent {
  constructor(parameters: Array<BaseParam>) {
    super(ComponentType.Header, parameters);
  }
}

export enum ButtonComponentType {
  /**
   * Refers to a previously created quick reply button
   * that allows for the customer to return a predefined message.
   */
  QuickReply = "quick_reply",
  /**
   * Refers to a previously created button that allows the customer
   * to visit the URL generated by appending the text parameter to the
   * predefined prefix URL in the template.
   */
  Url = "url",
  /**
   * Refers to a previously created catalog button that allows for the
   * customer to return a full product catalog.
   */
  Catalog = "catalog",
}

export abstract class BaseButtonComponent extends Component {
  /**
   * @param index Position index of the button. You can have up to 10 buttons using index values of 0 to 9.
   */
  constructor(
    readonly subType: ButtonComponentType,
    public index: number,
  ) {
    super(ComponentType.Button);
  }

  override ToJSON(): object {
    return {
      type: ComponentType.Button,
      sub_type: this.subType,
      index: this.index.toString(),
    };
  }
}

export class QuickReplyButtonComponent extends BaseButtonComponent {
  constructor(
    public payload: string,
    index: number,
  ) {
    super(ButtonComponentType.QuickReply, index);
  }

  override ToJSON(): object {
    const prev = super.ToJSON();

    return {
      ...prev,
      parameters: [
        {
          type: ButtonParamType.Payload,
          payload: this.payload,
        },
      ],
    };
  }
}

export class UrlButtonComponent extends BaseButtonComponent {
  constructor(
    public text: string,
    index: number,
  ) {
    super(ButtonComponentType.Url, index);
  }

  override ToJSON(): object {
    const prev = super.ToJSON();

    return {
      ...prev,
      parameters: [
        {
          type: ButtonParamType.Text,
          text: this.text,
        },
      ],
    };
  }
}

export class CatalogButtonComponent extends BaseButtonComponent {
  constructor(
    public param: BaseButtonParam,
    index: number,
  ) {
    super(ButtonComponentType.Catalog, index);
  }

  override ToJSON(): object {
    const prev = super.ToJSON();

    return {
      ...prev,
      parameters: [this.param.ToJSON()],
    };
  }
}
