/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_recursive_factorial.c                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/14 19:39:21 by blaine            #+#    #+#             */
/*   Updated: 2019/10/14 19:55:11 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_recursive_factorial(int nb)
{
	int result;

	result = nb;
	if (nb == 1 || nb == 0)
		return (1);
	else if (nb > 12 || nb < 0)
		return (0);
	else
		return (result * ft_recursive_factorial(nb - 1));
}
