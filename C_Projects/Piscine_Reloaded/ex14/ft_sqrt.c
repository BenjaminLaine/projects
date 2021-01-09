/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sqrt.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/14 19:56:03 by blaine            #+#    #+#             */
/*   Updated: 2019/10/15 16:56:40 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int	ft_sqrt(int nb)
{
	int count;
	int result;

	result = 1;
	count = 1;
	if (nb == 0 || nb == 1)
		return (nb);
	while (result <= nb)
	{
		count++;
		result = count * count;
	}
	if (((count - 1) * (count - 1)) == nb)
		return (count - 1);
	return (0);
}
