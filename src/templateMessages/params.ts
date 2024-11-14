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

export interface DocumentParamProps {
  caption?: string;
  /**The extension of the filename will specify what format the document is displayed as in WhatsApp. */
  filename?: string;
}

export class DocumentParam extends BaseParam implements DocumentParamProps {
  link!: string;
  id!: string;
  caption?: string;
  filename?: string;

  private constructor({ caption, filename }: DocumentParamProps) {
    super(ParamType.Document);

    if (caption) {
      this.caption = caption;
    }
    if (filename) {
      this.filename = filename;
    }
  }

  static FromId(id: string, props: DocumentParamProps = {}) {
    const obj = new this(props);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, props: DocumentParamProps = {}) {
    const obj = new this(props);
    obj.link = link;

    return obj;
  }

  override ToJSON(): object {
    const document: Dict<string> = {};

    if (this.id !== undefined) {
      document.id = this.id;
    } else if (this.link !== undefined) {
      document.link = this.link;
    } else {
      panic("Neither of `link` or `id` are defined");
    }

    const { caption, filename } = this;
    if (caption) {
      document.caption = caption;
    }
    if (filename) {
      document.filename = filename;
    }

    return {
      type: this.type,
      document,
    };
  }
}

export class ImageParam extends BaseParam {
  caption?: string;
  link!: string;
  id!: string;

  private constructor(caption?: string) {
    super(ParamType.Image);
    if (caption) {
      this.caption = caption;
    }
  }

  static FromId(id: string, caption?: string) {
    const obj = new this(caption);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, caption?: string) {
    const obj = new this(caption);
    obj.link = link;

    return obj;
  }

  override ToJSON(): object {
    const image: Dict<string> = {};

    if (this.id !== undefined) {
      image.id = this.id;
    } else if (this.link !== undefined) {
      image.link = this.link;
    } else {
      panic("Neither of `link` or `id` are defined");
    }

    if (this.caption) {
      image.caption = this.caption;
    }

    return {
      type: this.type,
      image,
    };
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

export class VideoParam extends BaseParam {
  caption?: string;
  link!: string;
  id!: string;

  private constructor(caption?: string) {
    super(ParamType.Video);
    if (caption) {
      this.caption = caption;
    }
  }

  static FromId(id: string, caption?: string) {
    const obj = new this(caption);
    obj.id = id;

    return obj;
  }

  static FromLink(link: string, caption?: string) {
    const obj = new this(caption);
    obj.link = link;

    return obj;
  }

  override ToJSON(): object {
    const video: Dict<string> = {};

    if (this.id !== undefined) {
      video.id = this.id;
    } else if (this.link !== undefined) {
      video.link = this.link;
    } else {
      panic("Neither of `link` or `id` are defined");
    }

    if (this.caption) {
      video.caption = this.caption;
    }

    return {
      type: this.type,
      video,
    };
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
