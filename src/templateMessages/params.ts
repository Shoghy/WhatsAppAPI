import { panic } from "rusting-js";

export enum ParamType {
  Currency = "currency",
  DateTime = "date_time",
  Document = "document",
  Image = "image",
  Text = "text",
  Video = "video",
}

export abstract class BaseParam {
  constructor(public readonly type: ParamType) {}

  ToJSON(): object {
    return {
      type: this.type,
    };
  }
}

export interface CurrencyParamProps {
  /**Default text if localization fails. */
  fallbackValue: string;
  /**Currency code as defined in ISO 4217. */
  code: string;
  /**Amount multiplied by 1000. */
  amount1000: number;
}

export class CurrencyParam extends BaseParam implements CurrencyParamProps {
  fallbackValue: string;
  code: string;
  amount1000: number;

  constructor({ fallbackValue, code, amount1000 }: CurrencyParamProps) {
    super(ParamType.Currency);

    this.fallbackValue = fallbackValue;
    this.code = code;
    this.amount1000 = amount1000;
  }

  override ToJSON(): object {
    return {
      type: this.type,
      currency: {
        fallback_value: this.fallbackValue,
        code: this.code,
        amount_1000: this.amount1000,
      },
    };
  }
}

export class DateTimeParam extends BaseParam {
  /**
   * @param fallbackValue Default text. For Cloud API, we always use the fallback value,
   * and we do not attempt to localize using other optional fields.
   */
  constructor(public fallbackValue: string) {
    super(ParamType.DateTime);
  }

  override ToJSON(): object {
    return {
      type: this.type,
      date_time: {
        fallback_value: this.fallbackValue,
      },
    };
  }
}

type MediaParamType = ParamType.Image | ParamType.Video | ParamType.Document;
abstract class MediaParam extends BaseParam {
  caption?: string;
  link?: string;
  id?: string;

  protected constructor(type: MediaParamType, caption?: string) {
    super(type);

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
      ...obj,
      type: this.type,
    };
  }
}

export interface DocumentParamProps {
  caption?: string;
  /**The extension of the filename will specify what format the document is displayed as in WhatsApp. */
  filename?: string;
}

export class DocumentParam extends MediaParam {
  filename?: string;

  private constructor({ caption, filename }: DocumentParamProps) {
    super(ParamType.Document, caption);

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
  static FromId(id: string, caption?: string): ImageParam {
    const obj = new this(ParamType.Image, caption);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, caption?: string): ImageParam {
    const obj = new this(ParamType.Image, caption);
    obj.link = link;

    return obj;
  }
}

export class TextParam extends BaseParam {
  constructor(public text: string) {
    super(ParamType.Text);
  }

  override ToJSON(): object {
    return {
      type: this.type,
      text: this.text,
    };
  }
}

export class VideoParam extends MediaParam {
  static FromId(id: string, caption?: string): VideoParam {
    const obj = new this(ParamType.Video, caption);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, caption?: string): VideoParam {
    const obj = new this(ParamType.Video, caption);
    obj.link = link;

    return obj;
  }
}

export enum ButtonParamType {
  Payload = "payload",
  Text = "text",
}

export abstract class BaseButtonParam {
  constructor(public readonly type: ButtonParamType) {}

  ToJSON(): object {
    return {
      type: this.type,
    };
  }
}

export class ButtonPayloadParam extends BaseButtonParam {
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

export class ButtonTextParam extends BaseButtonParam {
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
