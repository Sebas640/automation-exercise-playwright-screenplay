import type { Actor } from '../actor/Actor';
import type { Task } from '../actor/Activity';
import { Enter } from '../interactions/Enter';
import { ProductDetailPage } from '../ui/ProductDetailPage';

export interface Review {
  name: string;
  email: string;
  text: string;
}

/** Completa nombre, correo y texto del formulario "Write Your Review". */
export class FillInReview implements Task {
  private constructor(private readonly review: Review) {}

  static with(review: Review): FillInReview {
    return new FillInReview(review);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Enter.theValue(this.review.name).into(ProductDetailPage.REVIEW_NAME_INPUT),
      Enter.theValue(this.review.email).into(ProductDetailPage.REVIEW_EMAIL_INPUT),
      Enter.theValue(this.review.text).into(ProductDetailPage.REVIEW_TEXT_INPUT),
    );
  }

  toString(): string {
    return `completa la reseña como ${this.review.name}`;
  }
}
