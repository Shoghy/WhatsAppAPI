import { panic } from "rusting-js";

export enum ParamType {
  Currency = "currency",
  DateTime = "date_time",
  Document = "document",
  Image = "image",
  Text = "text",
  Video = "video",
}

export abstract class Param {
  constructor(
    public type: ParamType,
    public paramName?: string,
  ) {}

  ToJSON(): object {
    const obj = {
      type: this.type,
    } as Dict<string>;

    if (this.paramName !== undefined) {
      obj.paramName = this.paramName;
    }

    return obj;
  }
}

export interface CurrencyParamProps {
  /**Default text if localization fails. */
  fallbackValue: string;
  /**Currency code as defined in ISO 4217. */
  code: string;
  /**Amount multiplied by 1000. */
  amount1000: number;
  paramName?: string;
}

export class CurrencyParam extends Param implements CurrencyParamProps {
  fallbackValue: string;
  code: string;
  amount1000: number;

  constructor({
    fallbackValue,
    code,
    amount1000,
    paramName,
  }: CurrencyParamProps) {
    super(ParamType.Currency, paramName);

    this.fallbackValue = fallbackValue;
    this.code = code;
    this.amount1000 = amount1000;
  }

  override ToJSON(): object {
    return {
      ...super.ToJSON(),
      currency: {
        fallback_value: this.fallbackValue,
        code: this.code,
        amount_1000: this.amount1000,
      },
    };
  }
}

export class DateTimeParam extends Param {
  /**
   * @param fallbackValue Default text. For Cloud API, we always use the fallback value,
   * and we do not attempt to localize using other optional fields.
   */
  constructor(
    public fallbackValue: string,
    paramName?: string,
  ) {
    super(ParamType.DateTime, paramName);
  }

  override ToJSON(): object {
    return {
      ...super.ToJSON(),
      date_time: {
        fallback_value: this.fallbackValue,
      },
    };
  }
}

type MediaParamType = ParamType.Image | ParamType.Video | ParamType.Document;

export interface MediaParamProps {
  type: MediaParamType;
  caption?: string;
  paramName?: string;
}

export type IMediaParam = Omit<MediaParamProps, "type">;

abstract class MediaParam extends Param {
  caption?: string;
  link?: string;
  id?: string;

  protected constructor({ type, caption, paramName }: MediaParamProps) {
    super(type, paramName);

    if (caption !== undefined) {
      this.caption = caption;
    }
  }

  override ToJSON(): object {
    const fieldName = this.type;
    const obj: Dict<Dict<unknown>> = {};

    if (this.id !== undefined) {
      obj[fieldName] = {
        id: this.id,
      };
    } else if (this.link !== undefined) {
      obj[fieldName] = {
        link: this.link,
      };
    } else {
      panic("Neither of `link` or `id` are defined");
    }

    if (this.caption !== undefined) {
      obj[fieldName].caption = this.caption;
    }

    return {
      ...super.ToJSON(),
      ...obj,
    };
  }
}

export interface DocumentParamProps extends IMediaParam {
  /**The extension of the filename will specify what format the document is displayed as in WhatsApp. */
  filename?: string;
}

export class DocumentParam extends MediaParam {
  filename?: string;

  protected constructor({ filename, ...mediaProps }: DocumentParamProps) {
    super({ ...mediaProps, type: ParamType.Document });

    if (filename !== undefined) {
      this.filename = filename;
    }
  }

  static FromId(id: string, props: DocumentParamProps = {}): DocumentParam {
    const obj = new this(props);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, props: DocumentParamProps = {}): DocumentParam {
    const obj = new this(props);
    obj.link = link;

    return obj;
  }

  override ToJSON(): object {
    const prev = super.ToJSON() as Dict<Dict<unknown>>;

    if (this.filename !== undefined) {
      prev.document.filename = this.filename;
    }

    return prev;
  }
}

export class ImageParam extends MediaParam {
  static FromId(id: string, props: IMediaParam = {}): ImageParam {
    const obj = new this({ ...props, type: ParamType.Image });
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, props: IMediaParam = {}): ImageParam {
    const obj = new this({ ...props, type: ParamType.Image });
    obj.link = link;

    return obj;
  }
}

export class TextParam extends Param {
  constructor(
    public text: string,
    paramName?: string,
  ) {
    super(ParamType.Text, paramName);
  }

  override ToJSON(): object {
    return {
      ...super.ToJSON(),
      text: this.text,
    };
  }
}

export class VideoParam extends MediaParam {
  static FromId(id: string, props: IMediaParam = {}): VideoParam {
    const obj = new this({ ...props, type: ParamType.Video });
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, props: IMediaParam = {}): VideoParam {
    const obj = new this({ ...props, type: ParamType.Video });
    obj.link = link;

    return obj;
  }
}

export enum ButtonParamType {
  Payload = "payload",
  Text = "text",
}

export abstract class ButtonParam {
  constructor(public readonly type: ButtonParamType) {}

  ToJSON(): object {
    return {
      type: this.type,
    };
  }
}

export class ButtonPayloadParam extends ButtonParam {
  constructor(public payload: string) {
    super(ButtonParamType.Payload);
  }

  override ToJSON(): object {
    return {
      type: this.type,
      payload: this.payload,
    };
  }
}

export class ButtonTextParam extends ButtonParam {
  constructor(public text: string) {
    super(ButtonParamType.Payload);
  }

  override ToJSON(): object {
    return {
      type: this.type,
      text: this.text,
    };
  }
}
